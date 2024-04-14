export class ExitAppUseCase {
  call = () => {
    process.exit();
  };
}
