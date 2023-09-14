export const healthCheck = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      { status: 200 },
      null, 2
    ),
  };
};
