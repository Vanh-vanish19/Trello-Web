import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'


function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()
  const submitRegister = async (data) => {
    const { email, password } = data
    const user= await toast.promise(
      registerUserAPI({ email, password }),
      { pending: 'Registering...' }
    )
    navigate(`/login?registeredEmail=${user.email}`)
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #0079BF, #004A74)',
        padding: 2
      }}
    >
      <form onSubmit={ handleSubmit(submitRegister)}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <MuiCard sx={{
            minWidth: 480,
            maxWidth: 480,
            padding: 4,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>

            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
              <TrelloIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Sign Up for Trello
            </Typography>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <TextField
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
                error= {!!errors['email']}
                {...register('email',
                  {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: EMAIL_RULE,
                      message: EMAIL_RULE_MESSAGE
                    }
                  }
                )
                }
              />
              <FieldErrorAlert errors = {errors} fieldName = {'email'}/>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                error= {!!errors['password']}
                {...register('password',
                  {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  }
                )
                }
              />
              <FieldErrorAlert errors = {errors} fieldName = {'password'}/>
              <TextField
                fullWidth
                label="Enter Password Confirmation..."
                type="password"
                variant="outlined"
                error= {!!errors['password_confirmation']}
                {...register('password_confirmation', {
                  validate: (value) => {
                    if (value === watch('password')) return true
                    else return 'Not match password'
                  }
                })}
              />
              <FieldErrorAlert errors = {errors} fieldName = {'password_confirmation'}/>
            </Stack>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 3, mb: 2, color: 'white' }}
            >
              Register
            </Button>
            {/* Link Login */}
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography>Already have an account?</Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                  Log in!
                </Typography>
              </Link>
            </Box>

            <Typography variant="caption" sx={{ mt: 3, color: 'grey.500' }}>
              Author: Vanish
            </Typography>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default RegisterForm