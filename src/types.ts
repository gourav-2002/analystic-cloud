/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  accentText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}
