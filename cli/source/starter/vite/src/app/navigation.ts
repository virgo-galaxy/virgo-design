import { useLocation } from 'react-router';

export { useNavigate } from 'react-router';

export function usePathname() {
  return useLocation().pathname;
}
