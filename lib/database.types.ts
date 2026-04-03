export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      perfil: {
        Row: {
          id: string;
          nombre: string | null;
          avatar_url: string | null;
          moneda: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nombre?: string | null;
          avatar_url?: string | null;
          moneda?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          nombre?: string | null;
          avatar_url?: string | null;
          moneda?: string;
          updated_at?: string;
        };
      };
      categoria: {
        Row: {
          id: number;
          nombre: string;
          icono: string | null;
          color: string | null;
        };
        Insert: {
          nombre: string;
          icono?: string | null;
          color?: string | null;
        };
        Update: {
          nombre?: string;
          icono?: string | null;
          color?: string | null;
        };
      };
      subscriptions: {
        Row: {
          id: number;
          user_id: string;
          provider_id: number;
          currency_type_id: number;
          price: number;
          type: string;
          billing_day: number;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          user_id: string;
          provider_id: number;
          currency_type_id: number;
          price: number;
          type: string;
          billing_day: number;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          provider_id?: number;
          currency_type_id?: number;
          price?: number;
          type?: string;
          billing_day?: number;
          is_active?: boolean | null;
        };
      };
      currency_types: {
        Row: {
          id: number;
          currency: string;
          symbol: string;
        };
        Insert: {
          currency: string;
          symbol: string;
        };
        Update: {
          currency?: string;
          symbol?: string;
        };
      };
      providers: {
        Row: {
          id: number;
          name: string;
          icon: string | null;
          url: string | null;
        };
        Insert: {
          name: string;
          icon?: string | null;
          url?: string | null;
        };
        Update: {
          name?: string;
          icon?: string | null;
          url?: string | null;
        };
      };
      proveedor: {
        Row: {
          id: number;
          id_categoria: number | null;
          nombre: string;
          icono: string | null;
          color: string | null;
          url: string | null;
          created_at: string;
        };
        Insert: {
          id_categoria?: number | null;
          nombre: string;
          icono?: string | null;
          color?: string | null;
          url?: string | null;
          created_at?: string;
        };
        Update: {
          id_categoria?: number | null;
          nombre?: string;
          icono?: string | null;
          color?: string | null;
          url?: string | null;
        };
      };
      suscripcion: {
        Row: {
          id: string;
          id_usuario: string;
          id_proveedor: number;
          precio: number;
          tipo: "mensual" | "anual";
          dia_cobro: number;
          fecha_inicio: string;
          fecha_fin: string | null;
          activo: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          id_usuario: string;
          id_proveedor: number;
          precio: number;
          tipo: "mensual" | "anual";
          dia_cobro: number;
          fecha_inicio: string;
          fecha_fin?: string | null;
          activo?: boolean;
          created_at?: string;
        };
        Update: {
          precio?: number;
          tipo?: "mensual" | "anual";
          dia_cobro?: number;
          fecha_inicio?: string;
          fecha_fin?: string | null;
          activo?: boolean;
        };
      };
      gasto_mensual: {
        Row: {
          id: string;
          id_suscripcion: string;
          mes: number;
          anio: number;
          monto: number;
          fecha_cobro: string;
          pagado: boolean;
          notas: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          id_suscripcion: string;
          mes: number;
          anio: number;
          monto: number;
          fecha_cobro: string;
          pagado?: boolean;
          notas?: string | null;
          created_at?: string;
        };
        Update: {
          monto?: number;
          fecha_cobro?: string;
          pagado?: boolean;
          notas?: string | null;
        };
      };
    };
  };
}
