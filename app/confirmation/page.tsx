import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Success animation ring */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
          <div className="relative w-28 h-28 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#6B1E2E] mb-3">
          Order Received! 🎉
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm mx-auto">
          Your order has been received! We&apos;ll contact you shortly to confirm
          your delivery details and estimated arrival time.
        </p>

        {/* WhatsApp notification card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8] mb-8 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-green-200">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-white"
                aria-label="WhatsApp"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                WhatsApp Notification Sent
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                The Scoop-a-holics team has been notified
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Our team at{" "}
            <span className="font-bold text-[#6B1E2E]">07088323317</span> will
            confirm your order and share your delivery ETA via WhatsApp.
          </p>
        </div>

        {/* Order info reminder */}
        <div className="bg-[#6B1E2E]/5 border border-[#6B1E2E]/10 rounded-2xl p-4 mb-8 text-left">
          <p className="text-xs text-[#6B1E2E] font-semibold uppercase tracking-wide mb-1">
            What&apos;s next?
          </p>
          <ul className="text-sm text-gray-600 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-[#C9973A] font-bold mt-0.5">1.</span>
              We review your order &amp; confirm via WhatsApp
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C9973A] font-bold mt-0.5">2.</span>
              Your food is freshly prepared
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C9973A] font-bold mt-0.5">3.</span>
              Delivery rider brings it to your door
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/menu">
            <button className="w-full bg-[#6B1E2E] text-white font-bold py-4 rounded-2xl hover:bg-[#4A1520] transition-colors shadow-lg shadow-[#6B1E2E]/20">
              Order More
            </button>
          </Link>
          <Link href="/">
            <button className="w-full border-2 border-[#E0D0C0] text-[#6B1E2E] font-semibold py-4 rounded-2xl hover:bg-[#F5EBD8] transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
