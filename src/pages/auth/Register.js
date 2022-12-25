import { GrFacebook } from 'react-icons/gr';
import Input from '../../components/Input';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { register } from '../../firebase.js';
import { Formik, Form } from 'formik';
import { RegisterSchema } from '../../validation';
import Button from '../../components/Button';
import Separator from '../../components/Separator';
import Image from '../../components/image';
import { Helmet } from 'react-helmet';


export default function Register() {

  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (values, actions) => {
    const response = await register(values)
    if (response) {
      navigate(location.state?.return_url || '/', {
        replace: true
      })
    }

  }

  return (
    <div className='w-[350px] pt-24'>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className='grid gap-y-4'>
        <div className=' bg-white border px-[40px] pt-10 pb-6'>
          <a href='#' className='flex justify-center mb-4'>
            <Image
              className='h-[51px]' url={'logo1.png'} alt=''
            />
          </a>
          <p className='text-[17px] font-semibold text-[#8e8e8e] mb-6 text-center'>
            Sing up to see photos and videos from your friends.
          </p>
          <Button>
            <GrFacebook size={20} />
            Log in with Facebook
          </Button>
          <Separator></Separator>
          <Formik
            validationSchema={RegisterSchema}
            initialValues={{
              email: '',
              full_name: '',
              username: '',
              password: ''

            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, isValid, dirty }) => (
              <Form className='grid gap-y-1.5'>
                <Input name="email" label="Email" />
                <Input name="full_name" label="Full Name" />
                <Input name="username" label="Username" />
                <Input type="password" name="password" label="Password" />
                <p className='text-xs text-[#8e8e8e] py-2'>
                  People who use our service may have uploaded your contact information to Instagram.<a href='#' className='font-semibold'>Learn More</a>
                  <br /><br />
                  By signing up, you agree to our <a href='#' className='font-semibold'>Terms</a> , <a href='#' className='font-semibold'>Data Policy</a> and <a href='#' className='font-semibold'> Cookies Policy . </a>
                </p>
                <Button type='submit' disabled={!isValid || !dirty || isSubmitting}>Sign Up</Button>

              </Form>
            )}

          </Formik>


        </div>
        <div className='w-full h-14 rounded  bg-white border flex items-center justify-center text-sm'>
          Have an a account?<Link to="/auth/login" className='text-facebook font pl-2 cursor-pointer font-semibold'>Log In</Link>
        </div>
      
      </div>
    </div>


  );
}
