import Link from "next/link";
import { StaticLayout } from "../components/Layout";

import {
  LockSVG,
  ColoredLock,
  CrossSVG,
  ProcessCircle,
} from "../assets/SVG/image";

import { APP_INFO } from "../environments/index";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/authentication";

const Login = () => {
  const { TITLE } = APP_INFO;

  const email_ref = useRef<HTMLInputElement>(null);
  const pass_ref = useRef<HTMLInputElement>(null);

  const { LoginToAccount } = useContext(AuthContext);
  const [process, setProcess] = useState<Boolean>(false);

  const Submit = async (e) => {
    e.preventDefault();
    setProcess(true);
    if (!(email_ref!.current.value && pass_ref!.current.value)) {
      console.log("Fill All values");
      return;
    }
    const body = {
      email: email_ref!.current.value,
      password: pass_ref!.current.value,
    };
    const err = await LoginToAccount(body);
    if (err) {
      setTimeout(() => {
        setProcess(false);
      }, 1000);
    }
  };

  return (
    <StaticLayout title={`Login | ${TITLE}`}>
      <div className="min-h-full flex items-center justify-center py-10 mb-20  px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-xl md:text-3xl font-bold text-secondary-300 font-primary">
              Log in to your account{" "}
              <span className="text-primary-100">{TITLE}</span>
            </h2>
          </div>

          <div className="px-5 py-4 bg-gray-100 rounded-lg flex items-center justify-between mt-7">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ColoredLock />
              </div>

              <p className="md:text-sm text-xs text-secondary-300 pl-3">
                We take privacy issues seriously. You can be sure that your
                personal data is securely protected.
              </p>
            </div>
            <button className="block focus:outline-none focus:ring-2 focus:ring-gray-700 rounded">
              <CrossSVG />
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={Submit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  ref={email_ref}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-secondary-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={pass_ref}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-secondary-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-100 focus:ring-primary-300 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-secondary-300 font-primary"
                >
                  Remember Me
                </label>
              </div>
            </div>

            <div className="font-primary">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-100 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={process ? true : false}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3 font-primary">
                  {process === false ? <LockSVG /> : <ProcessCircle />}
                </span>
                Sign in
              </button>
              <div className="mt-2 font-primary">
                <Link href="/signup">
                  <span className="font-medium pr-2 leading-5 text-secondary-300">
                    Don't have an account?{" "}
                  </span>
                  <button
                    type="button"
                    className="text-sm font-medium rounded-md text-primary-100 hover:text-primary-300 focus:outline-none hover:underline"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </StaticLayout>
  );
};

export default Login;
