import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContex";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { NavbarMUI } from "../Utilities/Navbar";
import { FooterMUI } from "../Utilities/footer";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { setToken, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    let url = `${process.env.REACT_APP_API_URL}/login`;
    

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        UserName: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
    };

    const fetchResponse = await fetch(url, requestOptions);


    if (fetchResponse.status === 200) {
      let data = await fetchResponse.json();
      setIsAuthenticated(true);


      setToken(data.token);
      navigate("/overview");
    } else {
      alert("Incorrect credential");
    }
  }

  return (
<>
<NavbarMUI />
<Box className="background"> 
<Container >
      <Typography variant="h4" sx={{px:5, py:5}} align="center"  color={"palevioletred"}>Login your Account</Typography>
      <Box component="form" onSubmit={handleLogin} >
      <Stack direction={"column"} spacing={8} align="center" sx={{pt:5, py: 5}}>
      <Stack direction={"row"} spacing={4} justifyContent={"center"} > 
      <TextField helperText="Username" variant="standard" type="text" required  name="username" inputRef={usernameRef}/>
      </Stack>
      <Stack direction={"row"} spacing={4} justifyContent={"center"} > 
      <TextField helperText="Password" variant="standard" type="password" required  name="password" inputRef={passwordRef}/>
      </Stack>
      <Stack direction={"row"} spacing={4} justifyContent={"center"} >
      <Button type="submit" value="Login" variant="contained" sx={{ color: "White" }}>Login</Button>
      </Stack>

      </Stack>
      </Box>
    </Container>
    </Box>
<FooterMUI />
</>


  );
}