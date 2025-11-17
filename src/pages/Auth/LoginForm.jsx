import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'


function LoginForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const submitLogin = async (data) => {
    const { email, password } = data
    const res = await toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Logging inn...' }
    )
    if (!res.error) navigate('/')
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom,rgb(63, 170, 231),rgb(56, 111, 143))',
        padding: 2
      }}>
      <form onSubmit={ handleSubmit(submitLogin)}>
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
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Log In to Trello
            </Typography>

            <Box sx={{ width: '100%', mt: 1, mb: 1 }}>
              <Stack spacing={1}>
                <Alert severity="info" sx={{ display: 'flex', alignItems: 'center' }}>
                  Beta Version: System is under active development.
                </Alert>
                { verifiedEmail &&
                <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                    Your email&nbsp;
                  <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
                &nbsp;has been verified.
                </Alert>}
                { registeredEmail &&
                <Alert severity="info">
                  <Box sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    An email has been sent to&nbsp;
                    <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                      {registeredEmail}
                    </Typography>
                  </Box>
                  Please check and verify!
                </Alert>}
              </Stack>
            </Box>
            <Stack spacing={2} sx={{ width: '100%', mt: 1 }}>
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
                }/>
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
                }/>
              <FieldErrorAlert errors = {errors} fieldName = {'password'}/>
            </Stack>

            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 3, mb: 2, color: 'white' }}>
              Login
            </Button>
            {/* Link Đăng ký */}
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography>New to Trello?</Typography>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                  Create account!
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

export default LoginForm