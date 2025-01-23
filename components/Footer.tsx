import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">SceneConnect</h3>
            <p className="text-gray-400">Empowering creators & fans to connect like never before.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-primary">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <form className="flex space-x-2 mb-4">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700" />
              <Button type="submit">Subscribe</Button>
            </form>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} SceneConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

