import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export function AuthModal({ isOpen, mode, onClose, onSwitchMode }: AuthModalProps) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      onClose();
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div data-ev-id="ev_1a12b20100" className="text-center mb-6">
        <div data-ev-id="ev_89044af196" className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h2 data-ev-id="ev_cde259a346" className="text-2xl font-bold text-foreground">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p data-ev-id="ev_ca2120d6b1" className="text-muted-foreground mt-1">
          {mode === 'login' ?
          'Sign in to continue building' :
          'Start building beautiful websites'}
        </p>
      </div>

      <form data-ev-id="ev_f6f401b37c" onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'signup' &&
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          leftIcon={<User className="w-4 h-4" />}
          required />

        }

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          leftIcon={<Mail className="w-4 h-4" />}
          required />


        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
          <button data-ev-id="ev_0aad090893"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="hover:text-foreground">

              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          required />


        {mode === 'login' &&
        <div data-ev-id="ev_adf3994ce1" className="text-right">
            <button data-ev-id="ev_96584992fc" type="button" className="text-sm text-primary hover:text-primary-hover">
              Forgot password?
            </button>
          </div>
        }

        <Button type="submit" isLoading={isLoading} className="mt-2">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <div data-ev-id="ev_b4bd0e5db0" className="mt-6 text-center text-sm">
        <span data-ev-id="ev_9115704f51" className="text-muted-foreground">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
        </span>{' '}
        <button data-ev-id="ev_4511769d87"
        onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
        className="text-primary hover:text-primary-hover font-medium">

          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </Modal>);

}