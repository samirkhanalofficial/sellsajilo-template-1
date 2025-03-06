"use client";

import { API_URL } from "@/app/config/constant";
import { bookingType } from "@/app/types/booking.type";
import { companyType } from "@/app/types/company.type";
import { productType } from "@/app/types/product.type";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function BookingForm({
  company,
  hostname,
  product,
}: {
  product: productType;
  company: companyType;
  hostname: string;
}) {
  const [orderId, setOrderId] = useState<string>("");
  const [booking, setBooking] = useState<bookingType>();
  const [phone, setPhone] = useState("+977");
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [qty, setQty] = useState(1);
  const [otp, setOtp] = useState<number>(111111);
  const [loading, setLoading] = useState(false);

  async function submitForm() {
    setLoading(true);
    await fetch(`${API_URL}/v1/bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: fName,
        lname: lName,
        address,
        phone,
        email,
        qty,
        product: product._id,
        domain: hostname,
        paymentMethod,
      }),
    })
      .then(async (res) => {
        const body = await res.json();
        if (res.ok) {
          return body;
        } else {
          throw body.message ?? "Error Booking the product.";
        }
      })
      .then((res) => {
        setOrderId(res._id);
        setBooking(res);
        if (paymentMethod == "KHALTI") {
          window.location.href = res.paymentUrl;
        }
      })
      .catch((e) => toast.error(e.toString()))
      .finally(() => setLoading(false));
  }
  async function verifyPayment() {
    setLoading(true);
    await fetch(`${API_URL}/v1/bookings/verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        booking: orderId,
      }),
    })
      .then(async (res) => {
        const body = await res.json();
        if (res.ok) {
          return body;
        } else {
          throw body.message ?? "Error Verifying the order.";
        }
      })
      .then((res) => {
        console.log(res);
        toast.success("Booking Verified");
        setBooking(undefined);
        setOrderId("");
        setEmail("");
        setPhone("+977");
        setFName("");
        setLName("");
        setAddress("");
        setQty(1);
      })
      .catch((e) => toast.error(e.toString()))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      {orderId == "" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="p-2 flex flex-col gap-y-2"
          action=""
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              First Name <br />
              <input
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                type="text"
                className="p-2 w-full"
                placeholder="First Name"
              />
            </div>
            <div>
              Last Name <br />
              <input
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                type="text"
                className="p-2 w-full"
                placeholder="last Name"
              />
            </div>
          </div>
          Mobile Number:
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="p-2"
            placeholder="Phone"
          />
          Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="p-2"
            placeholder="Email"
          />
          Full Address:
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="p-2"
            placeholder="Full Address"
          />
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            name="paymentMethod"
            id="paymentMethod"
          >
            <option value="COD">COD</option>
            {company.khaltikey && company.khaltikey != "" && (
              <option value="KHALTI">KHALTI</option>
            )}
          </select>
          Quantity:
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value) ?? 1)}
            min={1}
            max={product.stocks}
            className="p-2"
            placeholder="Quantity"
          />
          <button
            type="submit"
            disabled={
              loading || (product.stocks == 0 && !product.unlimitedStocks)
            }
            style={{ background: company.brandColor }}
            className="hover:opacity-50 text-white p-3 rounded-md disabled:opacity-50 active:scale-95 duration-300 transition-all"
          >
            {loading ? (
              <>
                <ScaleLoader color="green" width={10} height={10} />
              </>
            ) : product.stocks == 0 && !product.unlimitedStocks ? (
              "Out of Stocks"
            ) : (
              "Order Now"
            )}
          </button>
        </form>
      )}
      {orderId != "" && booking && booking.paymentMethod == "COD" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyPayment();
          }}
          className="p-2 flex flex-col gap-y-2"
          action=""
        >
          OTP:
          <input
            value={otp}
            onChange={(e) => setOtp(parseInt(e.target.value ?? "0") ?? 0)}
            type="text"
            className="p-2"
            placeholder="6-Digit verification code"
          />
          <small>
            We have sent an verification code (otp) in your email. Please enter
            the otp to verify yourself.
          </small>
          <button
            type="submit"
            disabled={
              loading || (product.stocks == 0 && !product.unlimitedStocks)
            }
            style={{ background: company.brandColor }}
            className="hover:opacity-50 text-white p-3 rounded-md disabled:opacity-50 active:scale-95 duration-300 transition-all"
          >
            {loading ? (
              <>
                <ScaleLoader color="green" width={10} height={10} />
              </>
            ) : (
              "Verify Purchase"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
