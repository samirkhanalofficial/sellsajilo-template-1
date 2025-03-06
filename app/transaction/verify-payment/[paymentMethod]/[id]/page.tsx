import { API_URL } from "@/app/config/constant";

export default async function VerifyPayment({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}) {
  const { id: bookingId, paymentMethod } = await params;
  let isSuccess = false;
  async function verifyPayment() {
    await fetch(`${API_URL}/v1/bookings/pay/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const body = await res.json();
      console.log(body);
      if (res.ok) {
        isSuccess = true;
      }
    });
  }
  await verifyPayment();
  if (paymentMethod != "KHALTI")
    return (
      <div className="w-full h-screen flex justify-between items-center ">
        <center className="w-full">
          <h2 className="text-3xl">PAyment method not supported</h2>
          transaction Id: #${bookingId}
        </center>
      </div>
    );
  return (
    <div className="w-full h-screen flex justify-between items-center ">
      <center className="w-full">
        <h2
          className={`text-3xl ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {isSuccess ? "Payment Verified" : "Payment Error"}
        </h2>
        transaction Id: #${bookingId}
      </center>
    </div>
  );
}
