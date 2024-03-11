// Coloque aqui suas actions

export const writeEmail = 'WRITE_EMAIL';

export function emailAction(email: string) {
  return {
    type: writeEmail,
    payload: { email },
  };
}
