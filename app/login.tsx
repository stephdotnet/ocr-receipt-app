import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Box, Button, Text } from '@/components/atoms';
import { PasswordInput } from '@/components/atoms/PasswordInput';
import MainContainer from '@/components/layout/MainContainer';
import { useLogin } from '@/hooks/api/useAuth';
import { useCancelQueries } from '@/hooks/api/useCancelQueries';
import { CustomAxiosError } from '@/utils/api/api';
import { useFormik } from 'formik';
import { Input } from 'tamagui';

interface formValues {
  email: string;
  password: string;
}

export default function Details() {
  useCancelQueries();
  const { t } = useTranslation();
  const login = useLogin();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (value) => handleFormSubmit(value),
  });

  const handleFormSubmit = (values: formValues) => {
    login.mutate(values, {
      onError: (error: CustomAxiosError) => {
        error?.response?.validationErrors &&
          Object.entries(error.response.validationErrors || []).map(([key, value]) =>
            formik.setFieldError(key, value[0]),
          );
      },
      onSuccess: async (data) => {
        console.log('router push');
        router.push('/');
      },
    });
  };

  return (
    <MainContainer style={styles.container}>
      <Box style={styles.form}>
        <Box mb="$3">
          <Box>
            <Input
              theme={formik.errors.email ? 'red' : 'green'}
              color={formik.errors.email ? 'red' : 'green'}
              value={formik.values.email}
              placeholder={t('login.email')}
              onChangeText={formik.handleChange('email')}
              autoCapitalize="none"
            />
          </Box>
          {formik.errors.email && (
            <Box mt="$2">
              <Text variant="error">{formik.errors.email}</Text>
            </Box>
          )}
        </Box>
        <Box mb="$3">
          <Box>
            <PasswordInput
              placeholder={t('login.password')}
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              theme={formik.errors.password ? 'red' : 'green'}
              color={formik.errors.password ? 'red' : 'green'}
            />
          </Box>
          {formik.errors.password && (
            <Box mt="$2">
              <Text variant="error">{formik.errors.password}</Text>
            </Box>
          )}
        </Box>
        <Box>
          <Button
            theme="green"
            loading={login.isLoading}
            disabled={login.isLoading}
            onPress={() => {
              formik.handleSubmit();
            }}
          >
            {t('login.submit')}
          </Button>
        </Box>
      </Box>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  form: {
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: '650px',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    }),
  },
});
