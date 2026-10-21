import Image from "next/image";
import React from "react";

function Navabar() {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="container mx-auto flex justify-between py-4">
      <section className="flex gap-2 items-center">
        <section className="bg-green-600 w-[40px] h-[40px] p-2 rounded-[10px]">
          <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />
        </section>
        <section>
          <h1 className="text-[15px] font-semibold">বাজার দর</h1>
          <p className="text-[12px]">{date}</p>
        </section>
      </section>
      <section>
        <button
          className="btn"
          popoverTarget="popover-1"
          style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
        >
          <Image src='/logo-icon.png' alt="Logo" width={20} height={20} />
        </button>

        <ul
          className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
          popover="auto"
          id="popover-1"
          style={
            { positionAnchor: "--anchor-1" }
            /* as React.CSSProperties */
          }
        >
          <ul>
            <h1 className="text-center text-[15px]">Mohammad Riyaz Uddin</h1>
            <li className="text-[10px] text-center">Mohammad@gmail.com</li>
          </ul>

          <div>
            <li>
              <button className="border-1 p-2 mb-2 rounded-2xl hover:bg-gray-200 mt-5">
                👤 আমার প্রোফাইল
              </button>
            </li>
            <li>
              <button className="border-1 p-2 mb-2 rounded-2xl hover:bg-gray-200 ">
                ↩ সাইন আউট
              </button>
            </li>
          </div>
        </ul>
      </section>
    </section>
  );
}

export default Navabar;
