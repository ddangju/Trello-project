//이 파일은 type을  정의하기 위해 존재하는 파일
//기존의 코드를 오버라이딩하여 사용

import "styled-components";

// styled-compoments 테마 정의를 확장하는 방법
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
  }
}
