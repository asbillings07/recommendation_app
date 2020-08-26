/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { createUser, sendConfirmUserEmail, userLogin } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  TextField,
  Button,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { string as yupstring, object as yupobject } from 'yup'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: 8,
    marginBottom: 20
  },
  spacer: { margin: theme.spacing(1), float: 'right' },
  spacerLeft9: { marginLeft: theme.spacing(9) },
  spacerLeft: { marginLeft: theme.spacing(1) },
  fontWeightBold: { fontWeight: 'bold' },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
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
const SignUpFormSchema = yupobject().shape({
  firstName: yupstring().required('Required'),
  lastName: yupstring().required('Required'),
  email: yupstring().required('Required'),
  password: yupstring().min(8),
  confirmPassword: yupstring().required('Required')
})

const UserSignUp = ({ location, history }) => {
  const dispatch = useDispatch()
  const { userSignedIn, errorMessage, userCreated, sentConfEmail, token } = useSelector(
    (state) => state.users
  )
  const classes = useStyles()
  const { register, triggerValidation, errors, handleSubmit } = useForm({
    validationSchema: SignUpFormSchema,
    submitFocusError: true
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const cancel = () => {
    this.props.history.push('/')
  }
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const submitForm = (data) => {
    const fName = capitalize(data.firstName)
    const lName = capitalize(data.lastName)
    const user = {
      ...data,
      firstName: fName,
      lastName: lName
    }
    dispatch(createUser(user))
  }
  useEffect(() => {
    if (userCreated) dispatch(sendConfirmUserEmail(email))
  }, [userCreated])

  useEffect(() => {
    if (sentConfEmail) dispatch(userLogin({ email, password }))
  }, [sentConfEmail])

  useEffect(() => {
    const { from } = location.state || { from: { pathname: '/' } }
    if (userSignedIn) history.push(from)
  }, [userSignedIn])

  console.log({ userCreated, userSignedIn, sentConfEmail })

  return (
    <Container>
      <form onSubmit={handleSubmit(submitForm)}>
        <Typography className={classes.h3} variant='h3'>
          Sign Up
        </Typography>
        <br />
        <p className={classes.p}>{errorMessage}</p>
        <TextField
          fullWidth
          placeholder='First name'
          margin='dense'
          className={classes.selectEmpty}
          id='firstName'
          name='firstName'
          value={firstName}
          variant='outlined'
          onChange={(e) => {
            triggerValidation('firstName')
            setFirstName(e.target.value)
          }}
          error={!!errors.firstName}
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
        />
        <p className={classes.p}>{errors.firstName && '⚠ First Name Required'}</p>
        <TextField
          fullWidth
          placeholder='Last name'
          margin='dense'
          className={classes.selectEmpty}
          id='lastName'
          name='lastName'
          value={lastName}
          variant='outlined'
          onChange={(e) => {
            triggerValidation('lastName')
            setLastName(e.target.value)
          }}
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.lastName}
        />
        <p className={classes.p}>{errors.lastName && '⚠ Last Name Required'}</p>
        <TextField
          fullWidth
          placeholder='Email'
          margin='dense'
          className={classes.selectEmpty}
          id='email'
          name='email'
          value={email}
          variant='outlined'
          onChange={(e) => {
            triggerValidation('email')
            setEmail(e.target.value)
          }}
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.email}
        />
        <p className={classes.p}>{errors.email && '⚠ Email Required'}</p>
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
          onChange={(e) => {
            triggerValidation('password')
            setPassword(e.target.value)
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.password}
        />
        <p className={classes.p}>
          {console.log(errors.password)}
          {errors.password?.type === 'min' && errors.password.message}
        </p>
        <OutlinedInput
          fullWidth
          placeholder='Confirm password'
          type={showPassword ? 'text' : 'password'}
          margin='dense'
          className={classes.selectEmpty}
          id='confirmPassword'
          name='confirmPassword'
          value={confirmPassword}
          variant='outlined'
          onChange={(e) => {
            triggerValidation('confirmPassword')
            setConfirmPassword(e.target.value)
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={confirmPassword !== password}
        />
        <p className={classes.p}>
          {confirmPassword !== password && '⚠ password & confirm password must match'}
        </p>

        <Typography variant='body1'>
          Have an account already? <Link to='/signin'>Sign In</Link>
        </Typography>

        <Button className={(classes.button, classes.spacer)} type='submit'>
          Submit
        </Button>
        <Button className={(classes.button, classes.spacer)} onClick={() => cancel()}>
          Cancel
        </Button>
      </form>
    </Container>
  )
}

UserSignUp.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any
}

export default UserSignUp
