export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      manufacturers: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          website_url: string | null
          catalog_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          catalog_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          catalog_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      manufacturer_categories: {
        Row: {
          id: string
          manufacturer_id: string
          category_id: string
          created_at: string
        }
        Insert: {
          id?: string
          manufacturer_id: string
          category_id: string
          created_at?: string
        }
        Update: {
          id?: string
          manufacturer_id?: string
          category_id?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      regions: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      countries: {
        Row: {
          id: string
          name: string
          region_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          region_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          region_id?: string
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
