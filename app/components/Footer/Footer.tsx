import { companyType } from "@/app/types/company.type";
import Link from "next/link";
import { BiMapPin, BiPhone } from "react-icons/bi";

export default function Footer(vendor: companyType) {
  return (
    <footer className="border-t py-8 bg-muted/30 max-w-[900px] mx-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">{vendor.shopName}</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <BiMapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <p>{vendor.fullAddress}</p>
              </div>
              <div className="flex items-center gap-2">
                <BiPhone className="h-4 w-4 shrink-0" />
                <p>{vendor.phone}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Payment Methods</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cash On Delivery
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Khalti
              </Link>
              {/* <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Shipping & Returns
              </Link> */}
            </div>
          </div>
          <div className="">
            <h3 className="font-semibold mb-3"> </h3>
            <p className="text-sm text-muted-foreground mb-3">
              © {new Date().getFullYear()} {vendor.shopName}
              <br />
              All rights reserved.
              <br />
              {vendor.location && (
                <Link
                  href={vendor.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on Google Maps
                </Link>
              )}
            </p>
            <div className="flex gap-2">
              {/* <Input placeholder="Your email" className="max-w-xs" />
              <Button>Subscribe</Button> */}
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <small>powered by</small> Sell Sajilo
        </div>
      </div>
    </footer>
  );
}
