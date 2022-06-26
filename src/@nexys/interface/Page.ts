import { NextRouter } from 'next/router'

export interface PageProps {
  defaultPage: number
}

export interface RouterTabsProps {
  router: NextRouter
}

export type RouterPageProps = PageProps & RouterTabsProps