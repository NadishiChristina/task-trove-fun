
import { AuthForm } from '@/components/auth/AuthForm';
import { Layout } from '@/components/Layout';
import { useEffect } from 'react';

export default function Register() {
  useEffect(() => {
    document.title = 'Register | achieve+';
  }, []);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8 bg-card rounded-lg shadow-sm border p-8">
          <AuthForm type="register" />
        </div>
      </div>
    </Layout>
  );
}
