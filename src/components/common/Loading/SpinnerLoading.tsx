import { Box, Spinner } from "@parte-ds/ui";

export default function SpinnerLoading() {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Spinner size={48} />
    </Box>
  );
}
