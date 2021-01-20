import React, { useState, useEffect, useMemo } from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import styled from "styled-components"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useRouter } from 'next/router'
import Auth from 'lib/front_auth'

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "100px",
    },
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage:
            "url(https://source.unsplash.com/collection/19740856/1600x900)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.ฃ
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        fontFamily: "Kodchasan",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px",
    },
}))

const Page_Login = (props) => {

    const router = useRouter()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const classes = useStyles()

    useEffect(() => {
        if (props.cookies) {
            // window.location.href = "/index"
            router.push("/")
        }
    }, [])

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src="./logo.png" draggable="false" className={classes.logo} />
                    <Typography component="h1" variant="h5"></Typography>
                    <form
                        className={`${classes.form} need-validation`}
                        // onSubmit={onSubmit}
                        method="post"
                    >
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={username}
                            onChange={(event) => setusername(event.target.value)}
                            id="username"
                            label="ชื่อผู้ใช้"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={(event) => setpassword(event.target.value)}
                            label="รหัสผ่าน"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <SubmitButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        //   disabled={loading}
                        >
                            {/* {loading ? <CircularProgress size="30px"/> : "เข้าสู่ระบบ" }  */}
                        </SubmitButton>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = ({ req }) => {
    const auth = Auth(req)

    return {
        props: { cookies: auth }
    }
}


export default Page_Login

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #c62828;
      border-width: thin;
    }
    &:hover fieldset {
      border-color: #ef5350;
    }
    &.Mui-focused fieldset {
      border-color: #e65100;
    }
  }
  .MuiFormLabel-root {
    font-family: "Kodchasan";
    color: #e65100;
  }
  .MuiFormLabel-root.Mui-focused {
    color: #e65100;
  }
  .MuiInputBase-input {
    font-family: "Kodchasan";
  }
`

const SubmitButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  border-radius: 3px;
  font-family: Kodchasan;
  box-shadow: 0px 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  height: 48px;
  padding: 10px 30px;
  :focus {
    outline: none;
  }
`