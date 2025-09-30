import styled from "@emotion/styled";

const MARGIN = 10;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100% - ${MARGIN * 2}px - 45px);
  box-sizing: border-box;
  margin: ${MARGIN}px ${MARGIN}px 0px ${MARGIN}px;
  grid-row-start: 1;
`;
