import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Input, Button } from 'installer-design-system';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = loginId.trim().length > 0 && password.length > 0;

  const submit = () => {
    if (!canSubmit) return;
    navigate('/jobs');
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <Box as="main" className="min-h-screen bg-neutral-white">
      <Box className="mx-auto" maxWidth={480} minHeight="100vh">
        <Stack
          direction="column"
          justify="between"
          paddingX={24}
          paddingTop={64}
          paddingBottom={32}
          minHeight="100vh"
        >
          <Stack direction="column" gap={48}>
            <Box as="h1" className="text-display-32 font-bold text-primary">
              커넥트
              <br />
              현장서비스 인스톨러앱
            </Box>

            <Stack direction="column" gap={16}>
              <Input
                label="아이디"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                onClear={() => setLoginId('')}
                onKeyDown={handleEnter}
                autoComplete="username"
                required
              />
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClear={() => setPassword('')}
                onKeyDown={handleEnter}
                autoComplete="current-password"
                required
              />
            </Stack>
          </Stack>

          <Button
            variant="primary"
            size="lg"
            type="button"
            disabled={!canSubmit}
            onClick={submit}
            className="w-full"
          >
            로그인
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
