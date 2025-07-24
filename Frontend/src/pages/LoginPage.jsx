import InputField from "../components/InputField";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <img
          src="src/assets/images/images.jpeg"
          alt="Login Banner"
          className="w-full h-40 object-cover rounded-lg"
        />
        <h2 className="text-5xl font-semibold text-black">Welcome back!</h2>
        <div className="w-full space-y-4">
          <div>
            <label className="text-sm text-black block mb-1">Email ID</label>
            <InputField className="w-full" field="email" placeholder="Enter your email ID" />
          </div>
          <div>
            <label className="text-sm text-black block mb-1">Password</label>
            <InputField className="w-full" field="password" placeholder="Enter your password" />
          </div>
        </div>
        <button className="w-full bg-[#6572f8] text-white py-2 rounded-md text-sm font-medium">
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
