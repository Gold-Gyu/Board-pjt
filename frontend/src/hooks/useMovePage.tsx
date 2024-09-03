import { useNavigate } from 'react-router-dom';

const useMovePage = (): {
  movePage: (url: string, state: string | object | null) => void;
  goBack: () => void;
} => {
  const navigate = useNavigate();

  const movePage = (url: string, state: string | object | null) => {
    navigate(url, { state });
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    movePage,
    goBack,
  };
};

export default useMovePage;
