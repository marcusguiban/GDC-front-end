import React from 'react';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import { Typography,  Button, Stack, Container, TextField, Grid } from "@mui/material";
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
    <>
    <Container sx={{ pt: 5, mb: 5 }}>
      <Typography variant="h4" align="center" color="palevioletred"
      sx={{
        fontSize: {
          xs: "20px",
          sm: "28px",
          md: "36px",
          lg: "44px",
        },
        py: { xs: 1, sm: 2 }, px:{ xs: 1, sm: 2 }
      }}>
            Contact us
          </Typography>
      
          <form onSubmit={handleSubmit(onSubmit)} >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={2} >
            <TextField
              label="Name"
              type="text"
              
              {...register('name', { required: true })}
              error={!!errors.name}
              helperText={errors.name ? 'This field is required' : ''}
              sx={{
                width: '100%',
                '@media (min-width: 600px)': {
                  width: '400px',
                },
              }}
            />
            <TextField
              label="Email"
              type="email"
              {...register('email', { required: true })}
              error={!!errors.email}
              helperText={errors.email ? 'This field is required' : ''}
              sx={{
                width: '100%',
                '@media (min-width: 600px)': {
                  width: '400px',
                },
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1} >
            <TextField
              label="Message"
              multiline
              rows={4}
              {...register('message', { required: true })}
              error={!!errors.message}
              helperText={errors.message ? 'This field is required' : ''}
              sx={{
                width: '100%',
                '@media (min-width: 600px)': {
                  width: '400px',
                },
              }}
            />
            <Button size="lg" variant="outlined" color="secondary" type="submit"              
                          sx={{
                            width: '100%',
                            '@media (min-width: 600px)': {
                              width: '400px',
                            },
                          }}>
              Send Message
            </Button>
          </Stack>
        </Grid>
      </Stack>
    </form>
      
      </Container>
    </>
  );
}

export default ContactUsEmailSender;