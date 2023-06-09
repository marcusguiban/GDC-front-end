import React from 'react';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';

const ContactUsEmailSender = () =>  {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    emailjs
      .send(
        'service_aj4htz5',
        'template_nui7h3n',
        templateParams,
        'TIL9e2Jjl-WtMmy4v'
      )
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
          reset();
        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
  };

  return (
    <div className="App">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Message</label>
          <textarea {...register('message', { required: true })} />
          {errors.message && <span>This field is required</span>}
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactUsEmailSender;