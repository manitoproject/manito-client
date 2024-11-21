import ErrorComponent from '@/components/common/error';

export default function ErrorPage() {
  // if (!isRouteErrorResponse(error)) {
  //   return (
  //     <ErrorComponent>
  //       <p>
  //         서버에 문제가 있습니다.
  //         <br /> 잠시후 다시 시도해주세요.
  //       </p>
  //     </ErrorComponent>
  //   );
  // }
  return (
    <ErrorComponent>
      <p>
        페이지를 찾을 수 없습니다.
        <br />
        잘못된 주소를 입력하셨거나, 요청하신 페이지의 주소가
        <br />
        변경, 삭제되어 찾을 수 없습니다.
      </p>
    </ErrorComponent>
  );
}
