import { h, render, JSX } from 'preact';
import { Suspense, lazy } from 'preact/compat';
import styles from './index.scss';

const LazyAdder = lazy(async () => {
    const { Adder } = await import('./Adder');
    return Adder;
})

export const MyApp = class {
    constructor() {
        const App: Function = ({name}): JSX.Element => (
            <h1 className={styles.main}>
                Hello, {name}
                <Suspense fallback={<div>...Loading</div>}>
                    <LazyAdder a={1} b={2} />
                </Suspense>
            </h1>
        )

        render(<App name="Jim" />, document.body);
    }
}

window['MyApp'] = MyApp;
