import NavBar from './NavBar';
import { LayoutProps } from '../types/types';

function Layout({ children }: LayoutProps) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
}

export default Layout;
