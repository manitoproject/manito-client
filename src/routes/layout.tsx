import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Outlet, useParams } from 'react-router-dom';

import Header from '../components/header';
import { HeaderNavigation } from '../lib/headerNavigation';
import theme from '../styles/theme';

const getBoard = async (id?: string) => {
  if (!id) return;
  const { data } = await axios<Board>(`/board/${id}`);
  return data;
};

export default function Layout() {
  const params = useParams();
  const id = params.id;
  const { data } = useQuery({
    queryFn: () => getBoard(id),
    queryKey: ['board', id],
  });
  const header: HeaderNavigation | null = data?.subject
    ? {
        title: data.subject,
        isShowLeftBtn: true,
        isShowMenuBtn: true,
        bgColor: theme.colors.powderBlue[900],
        textColor: theme.colors.white,
        pathname: () => data.subject,
        theme: data.theme,
      }
    : null;
  return (
    <StyledWrapper>
      <Header header={header} />
      <StyledMain bg={header?.theme}>{<Outlet />}</StyledMain>
      <Backdrop />
    </StyledWrapper>
  );
}

export const Backdrop = styled.div`
  background-color: ${(props) => props.theme.colors.gray[100]};
  width: 100vw;
  height: 100vh;
  left: 0;
  z-index: -1;
  position: fixed;
`;

const StyledWrapper = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  line-height: normal;
  min-height: 100vh;
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  flex-direction: column;
  overflow: hidden;
`;

const StyledMain = styled.main<{ bg?: string }>`
  /* z-index: 50;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1); */
  background-image: ${(props) =>
    props.theme ? `url('/src/assets/imgs/theme/${props.bg}.png')` : 'none'};
  background-size: cover;
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  flex: 1;
  display: flex;
  padding: ${({
    theme: {
      sizes: { padding },
    },
  }) => `${padding} ${padding} 0`};
`;
