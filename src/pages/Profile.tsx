import { useState } from "react";
import { Link } from "react-router-dom";
import { User as UserIcon, Mail, Phone, Package, Heart, LogOut, ChevronRight, Edit2, Save, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Tab = "profile" | "orders" | "wishlist" | "security";

export default function ProfilePage() {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    setLoading(true);
    const result = await updateProfile(formData);
    if (result.success) {
      setMessage({ type: "success", text: "Perfil actualizado correctamente" });
      setIsEditing(false);
    } else {
      setMessage({ type: "error", text: result.error || "Error al actualizar" });
    }
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }
    setLoading(true);
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (result.success) {
      setMessage({ type: "success", text: "Contraseña cambiada correctamente" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setMessage({ type: "error", text: result.error || "Error al cambiar contraseña" });
    }
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { id: "profile" as Tab, label: "Perfil", icon: UserIcon },
    { id: "orders" as Tab, label: "Pedidos", icon: Package },
    { id: "wishlist" as Tab, label: "Favoritos", icon: Heart },
    { id: "security" as Tab, label: "Seguridad", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="container-wide py-4">
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">Mi Cuenta</span>
          </div>
        </div>

        <div className="container-wide pb-16">
          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-500/10 border border-green-500/20 text-green-600"
                  : "bg-destructive/10 border border-destructive/20 text-destructive"
              }`}
            >
              <p className="text-sm font-body">{message.text}</p>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                {/* User info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-14 h-14 wood-gradient rounded-full flex items-center justify-center text-accent-foreground font-display font-bold text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold">{user.name} {user.lastName}</h3>
                    <p className="text-sm font-body text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-body rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-sm font-body text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </button>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold">Información Personal</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-body border border-border rounded-md hover:bg-secondary transition-colors"
                      >
                        <Edit2 size={16} />
                        Editar
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-body border border-border rounded-md hover:bg-secondary transition-colors"
                        >
                          <X size={16} />
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 wood-gradient text-accent-foreground text-sm font-body font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                          <Save size={16} />
                          Guardar
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider mb-2">
                          Nombre
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-secondary pl-10 pr-4 py-3 text-sm font-body rounded-md focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider mb-2">
                          Apellido
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-secondary pl-10 pr-4 py-3 text-sm font-body rounded-md focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full bg-secondary pl-10 pr-4 py-3 text-sm font-body rounded-md focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider mb-2">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="w-full bg-secondary pl-10 pr-4 py-3 text-sm font-body rounded-md focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                          placeholder="+34 600 000 000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account info */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="font-display font-bold mb-4">Información de Cuenta</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Miembro desde:</span>
                        <p className="font-medium">{new Date(user.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Estado:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 ml-2">
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Mis Pedidos</h2>
                  <div className="text-center py-12">
                    <Package className="mx-auto text-muted-foreground mb-4" size={48} />
                    <h3 className="font-display font-bold mb-2">No tienes pedidos aún</h3>
                    <p className="text-sm font-body text-muted-foreground mb-6">
                      Cuando realices tu primer pedido, aparecerá aquí
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex px-6 py-3 wood-gradient text-accent-foreground text-sm font-body font-semibold tracking-wider uppercase rounded-md hover:opacity-90 transition-opacity"
                    >
                      Explorar Productos
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Mis Favoritos</h2>
                  <div className="text-center py-12">
                    <Heart className="mx-auto text-muted-foreground mb-4" size={48} />
                    <h3 className="font-display font-bold mb-2">Lista vacía</h3>
                    <p className="text-sm font-body text-muted-foreground mb-6">
                      Guarda tus productos favoritos para acceder rápidamente a ellos
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex px-6 py-3 wood-gradient text-accent-foreground text-sm font-body font-semibold tracking-wider uppercase rounded-md hover:opacity-90 transition-opacity"
                    >
                      Ver Catálogo
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Seguridad</h2>
                  
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider mb-2">
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full bg-secondary px-4 py-3 text-sm font-body rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider mb-2">
                          Nueva Contraseña
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full bg-secondary px-4 py-3 text-sm font-body rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                          placeholder="••••••••"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider mb-2">
                          Confirmar Contraseña
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="w-full bg-secondary px-4 py-3 text-sm font-body rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="px-6 py-3 wood-gradient text-accent-foreground text-sm font-body font-semibold tracking-wider uppercase rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Procesando..." : "Cambiar Contraseña"}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
