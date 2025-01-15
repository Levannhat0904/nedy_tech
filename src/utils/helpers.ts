import { Rule } from 'antd/es/form'
import { ACCESS_TOKEN } from '../constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || "";
  }
  return "";
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
}

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}

export function createSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
export const validateSlug = (_: Rule, value: string) => {
  if (!value) {
    return Promise.reject(new Error(''))
  }
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  if (!slugPattern.test(value)) {
    return Promise.reject(new Error('Slug chỉ được chứa các ký tự chữ thường, số và dấu gạch ngang'))
  }

  const slug = createSlug(value)
  if (!slugPattern.test(slug)) {
    return Promise.reject(new Error('Slug chỉ được chứa các ký tự chữ thường, số và dấu gạch ngang'))
  }
  return Promise.resolve()
}
