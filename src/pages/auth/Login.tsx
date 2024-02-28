import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const Login = () => (
  <div className="background">
    <div className="flex items-center justify-center max-w-md mx-auto my-8">
      <LoginForm />
    </div>
  </div>
);

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  //password must be 8 characters long and contain 2 of the following: uppercase, lowercase, number, special character
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: 'invalid password',
    }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //TODO send request, this will only be called if the form is valid
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              <FormDescription>Enter your email</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
              <FormDescription>
                Must be 8 characters long and contain 2 of the following:
                uppercase, lowercase, number, special character
              </FormDescription>
            </FormItem>
          )}
        />
        <FormItem>
          <Button type="submit">Login</Button>
        </FormItem>
      </form>
    </Form>
  );
};
