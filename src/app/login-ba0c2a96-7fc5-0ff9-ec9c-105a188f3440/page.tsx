import Button from "@/app/components/Button";
import { login, logout } from "./action";
import Header from "@/app/components/Header";

export default function LoginPage() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen container">
        <form className="bg-white w-full flex flex-col items-center gap-y-4 p-12 justify-center">
          <h1 className="border-primary border-b-2 p-2">Login</h1>
          <div className="w-full md:w-2/3 mt-5">
            <label htmlFor="email" className="text-xl relative ">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full h-12 rounded border border-accent p-3 flex"
            />
          </div>
          <div className="w-full md:w-2/3">
            <label htmlFor="email" className="text-xl relative ">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full h-12 rounded border border-accent p-3 flex"
            />
          </div>
          <div className="flex flex-col gap-4 mt-12">
            <Button formAction={login}>ログイン</Button>
            <Button formAction={logout}>ログアウト</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
