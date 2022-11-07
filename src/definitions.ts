export interface CapacitorPresentationPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
