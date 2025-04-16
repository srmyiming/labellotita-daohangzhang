export interface Database {
  public: {
    Tables: {
      /**
       * 制造商表
       * @future API: /rest/v1/manufacturers
       */
      manufacturers: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string | null
          city: string | null
          region: string | null
          phone: string | null
          email: string | null
          website: string | null
          verified: boolean
          founded_year: number | null
          employee_count: number | null
          annual_production: string | null
          daily_production: string | null
          storage_capacity: string | null
          production_lines: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address?: string | null
          city?: string | null
          region?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          verified?: boolean
          founded_year?: number | null
          employee_count?: number | null
          annual_production?: string | null
          daily_production?: string | null
          storage_capacity?: string | null
          production_lines?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string | null
          city?: string | null
          region?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          verified?: boolean
          founded_year?: number | null
          employee_count?: number | null
          annual_production?: string | null
          daily_production?: string | null
          storage_capacity?: string | null
          production_lines?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      /**
       * 制造商图片表
       * @future API: /rest/v1/manufacturer_images
       */
      manufacturer_images: {
        Row: {
          id: string
          manufacturer_id: string
          url: string
          type: string
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          manufacturer_id: string
          url: string
          type: string
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          manufacturer_id?: string
          url?: string
          type?: string
          order?: number
          created_at?: string
        }
      }
      /**
       * 制造商分类表
       * @future API: /rest/v1/manufacturer_categories
       */
      manufacturer_categories: {
        Row: {
          id: string
          name: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string | null
          created_at?: string
        }
      }
      manufacturer_category_relations: {
        Row: {
          manufacturer_id: string
          category_id: string
        }
        Insert: {
          manufacturer_id: string
          category_id: string
        }
        Update: {
          manufacturer_id?: string
          category_id?: string
        }
      }
      /**
       * 制造商产品表
       * @future API: /rest/v1/manufacturer_products
       */
      manufacturer_products: {
        Row: {
          id: string
          manufacturer_id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          manufacturer_id: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          manufacturer_id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      /**
       * 制造商认证表
       * @future API: /rest/v1/manufacturer_certifications
       */
      manufacturer_certifications: {
        Row: {
          id: string
          manufacturer_id: string
          name: string
          issue_date: string | null
          expiry_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          manufacturer_id: string
          name: string
          issue_date?: string | null
          expiry_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          manufacturer_id?: string
          name?: string
          issue_date?: string | null
          expiry_date?: string | null
          created_at?: string
        }
      }
      /**
       * 制造商出口国家表
       * @future API: /rest/v1/manufacturer_export_countries
       */
      manufacturer_export_countries: {
        Row: {
          manufacturer_id: string
          country_code: string
        }
        Insert: {
          manufacturer_id: string
          country_code: string
        }
        Update: {
          manufacturer_id?: string
          country_code?: string
        }
      }
      /**
       * 地区表
       * @future API: /rest/v1/regions
       */
      regions: {
        Row: {
          id: string
          name: string
          code: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          created_at?: string
        }
      }
      /**
       * 国家表
       * @future API: /rest/v1/countries
       */
      countries: {
        Row: {
          id: string
          name: string
          code: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          created_at?: string
        }
      }
    }
  }
}