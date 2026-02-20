import { Chrome, Github, Apple } from "lucide-react";

const SocialLogin = () => {
  return (
    <div className="space-y-3">
      <div className="auth-divider">or continue with</div>
      <div className="grid grid-cols-3 gap-3">
        <button type="button" className="auth-btn-social flex items-center justify-center gap-2">
          <Chrome size={20} />
        </button>
        <button type="button" className="auth-btn-social flex items-center justify-center gap-2">
          <Github size={20} />
        </button>
        <button type="button" className="auth-btn-social flex items-center justify-center gap-2">
          <Apple size={20} />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
