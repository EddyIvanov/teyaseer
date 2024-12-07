/* eslint-disable no-undef */
const buildId = (req, res) => {
  res.status(200).json({ buildId: process.env.NEXT_PUBLIC_SOURCE_VERSION });
};
export default buildId;
