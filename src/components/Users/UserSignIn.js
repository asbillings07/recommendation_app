import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { string as yupstring, object as yupobject } from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {} from 'react-bootstrap'
import {
  Container,
  TextField,
  Button,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: 8,
    marginBottom: 20,
    paddingRight: 7
  },
  spacer: { margin: theme.spacing(1), float: 'right' },
  spacerLeft9: { marginLeft: theme.spacing(9) },
  spacerLeft: { marginLeft: theme.spacing(1) },
  fontWeightBold: { fontWeight: 'bold' },
  formControl: { margin: theme.spacing(1), minWidth: 120 },
  p: {
    color: '#bf1650'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  h3: {
    marginTop: 20
  }
}))

const SignInFormSchema = yupobject().shape({
  email: yupstring().required('Required'),
  password: yupstring().required('Required')
})
export default function UserSignIn({ context, history, location }) {
  const { register, triggerValidation, errors, handleSubmit } = useForm({
    validationSchema: SignInFormSchema,
    submitFocusError: true
  })

  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInErrors, setSignInErrors] = useState([])
  const [showPassword, setShowPassword] = useState('')

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const submitForm = async data => {
    const { from } = location.state || { from: { pathname: '/' } }
    try {
      const res = await context.actions.signIn(data)
      if (res) history.push(from)
    } catch (e) {
      setSignInErrors(e.response.data.message)
    }
  }

  const cancel = () => {
    history.push('/')
  }

  return (
    <Container>
      <br />
      {signInErrors.map((err, i) => (
        <p className={classes.p} key={i}>
          ⚠ {err}
        </p>
      ))}
      <Typography variant='h3' className={classes.h3}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <p className={classes.p}>{errors.email && '⚠ Email Required'}</p>
        <TextField
          fullWidth
          placeholder='Email'
          margin='dense'
          className={classes.selectEmpty}
          id='email'
          name='email'
          type='email'
          value={email}
          variant='outlined'
          onChange={e => {
            triggerValidation('email')
            setEmail(e.target.value)
          }}
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.email}
        />
        <p className={classes.p}>{errors.password && '⚠ Password Required'}</p>
        <OutlinedInput
          fullWidth
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          margin='dense'
          className={classes.selectEmpty}
          id='password'
          name='password'
          value={password}
          variant='outlined'
          onChange={e => {
            triggerValidation('password')
            setPassword(e.target.value)
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.password}
        />

        <Button className={(classes.button, classes.spacer)} type='submit'>
          Log In
        </Button>
        <Button className={(classes.button, classes.spacer)} onClick={() => cancel()}>
          Cancel
        </Button>

        <Typography>
          <Link to='/forgotpassword'>Forgot password?</Link>
        </Typography>

        <Typography variant='body1'>
          <Link to='/signup'>Sign up</Link>{' '}
        </Typography>
      </form>
    </Container>
  )
}

UserSignIn.propTypes = {
  context: PropTypes.any,
  history: PropTypes.any,
  location: PropTypes.any
}
