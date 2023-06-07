import { PropsWithChildren } from 'react';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import styles from './DashboardSkeleton.module.scss';

export const DashboardSkeleton = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <header>
        <NavigationBar />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
