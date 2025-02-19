import { Provider } from 'jotai';

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider>{children}</Provider>
}
