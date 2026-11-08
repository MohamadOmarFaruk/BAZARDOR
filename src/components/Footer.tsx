export function Footer() {
  return (
    <>
      <footer className=" footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <section className="container mx-auto flex justify-between gap-40 sm:gap-30 flex-wrap sm:flex-nowrap  ">
          <nav>
            <h6 className="footer-title">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </h6>
          </nav>
          <nav>
            <h6 className="footer-title">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </h6>
          </nav>
        </section>
      </footer>
    </>
  );
}
