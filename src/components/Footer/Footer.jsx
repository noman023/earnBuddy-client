import { Footer } from "flowbite-react";

import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <footer className="bg-slate-900">
      <Footer
        container
        className="container mx-auto bg-slate-900 rounded-none my-5 md:my-8"
      >
        <div className="w-full text-gray-400">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <h1 className="text-2xl">Earn Buddy ltd.</h1>
              <p className="text-sm">earn small by done small.</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-5 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Flowbite</Footer.Link>
                  <Footer.Link href="#">Tailwind CSS</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Github</Footer.Link>
                  <Footer.Link href="#">Discord</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>

          <Footer.Divider />

          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="EarnBuddy™" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon
                target="_blank"
                href="https://github.com/noman023"
                icon={BsGithub}
              />
              <Footer.Icon
                target="_blank"
                href="https://www.linkedin.com/in/noman23/"
                icon={BsLinkedin}
              />
              <Footer.Icon
                target="_blank"
                href="https://www.facebook.com/98noman/"
                icon={BsFacebook}
              />
            </div>
          </div>
        </div>
      </Footer>
    </footer>
  );
}
