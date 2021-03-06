import { RESPONSE } from './constant';

const { STATUS, RESULT, SUCCESS } = RESPONSE;

const Success = (res, result) => res.status(200).json({
  [ STATUS ]: SUCCESS,
  [ RESULT ]: result
});

export { Success };
