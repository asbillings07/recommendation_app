import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
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
import swal from '@sweetalert/with-react'

const useStyles = makeStyles(theme => ({
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
  password: yupstring().required('Required'),
  confirmPassword: yupstring().required('Required')
})

const UserSignUp = ({ context, location, history }) => {
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
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const cancel = () => {
    this.props.history.push('/')
  }
  const submitForm = async data => {
    console.log(data)
    const { from } = location.state || { from: { pathname: '/' } }

    const res = await context.data.createUser(data)
    if (res) {
      setTimeout(() => {
        context.data.sendConfirmUserEmail(email).then(data => {
          swal({
            title: 'Confirmation Email sent to your inbox',
            icon: 'success'
          })
          if (data.status === 200) {
            setTimeout(() => {
              context.actions
                .signIn(email, password)
                .then(() => history.push(from))
            }, 2000)
          }
        })
      }, 1000)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(submitForm)}>
        <Typography className={classes.h3} variant='h3'>
          Sign Up
        </Typography>
        <br />
        <TextField
          fullWidth
          placeholder='First name'
          margin='dense'
          className={classes.selectEmpty}
          id='firstName'
          name='firstName'
          value={firstName}
          variant='outlined'
          onChange={e => {
            triggerValidation('firstName')
            setFirstName(e.target.value)
          }}
          error={!!errors.firstName}
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
        />
        <p className={classes.p}>
          {errors.firstName && '⚠ First Name Required'}
        </p>
        <TextField
          fullWidth
          placeholder='Last name'
          margin='dense'
          className={classes.selectEmpty}
          id='lastName'
          name='lastName'
          value={lastName}
          variant='outlined'
          onChange={e => {
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
          onChange={e => {
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
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.password}
        />
        <p className={classes.p}>{errors.password && '⚠ Password Required'}</p>
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
          onChange={e => {
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
          {confirmPassword !== password &&
            '⚠ password & confirm password must match'}
        </p>

        <Typography variant='body1'>
          Have an account already? <Link to='/signin'>Sign In</Link>
        </Typography>

        <Button className={(classes.button, classes.spacer)} type='submit'>
          Submit
        </Button>
        <Button
          className={(classes.button, classes.spacer)}
          onClick={() => cancel()}
        >
          Cancel
        </Button>
      </form>
    </Container>
  )
}

UserSignUp.propTypes = {
  context: PropTypes.any,
  history: PropTypes.any,
  location: PropTypes.any
}

export default UserSignUp
