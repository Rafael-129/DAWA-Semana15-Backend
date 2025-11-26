const { User, Role, Category, syncDatabase } = require('./src/models');

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed de base de datos...');
    
    // Sincronizar base de datos
    await syncDatabase();

    // Verificar si ya existen usuarios
    const usersCount = await User.count();
    if (usersCount > 0) {
      console.log('⚠️  Ya existen usuarios en la base de datos');
      console.log('   Saltando creación de usuarios de prueba');
    } else {
      // Obtener roles
      const adminRole = await Role.findOne({ where: { nombre: 'ADMIN' } });
      const customerRole = await Role.findOne({ where: { nombre: 'CUSTOMER' } });

      // Crear usuarios de prueba
      await User.create({
        nombre: 'Admin Test',
        email: 'admin@test.com',
        password: 'admin123',
        roleId: adminRole.id
      });
      console.log('✓ Usuario ADMIN creado: admin@test.com / admin123');

      await User.create({
        nombre: 'Customer Test',
        email: 'customer@test.com',
        password: 'customer123',
        roleId: customerRole.id
      });
      console.log('✓ Usuario CUSTOMER creado: customer@test.com / customer123');
    }

    // Verificar si ya existen categorías
    const categoriesCount = await Category.count();
    if (categoriesCount > 0) {
      console.log('⚠️  Ya existen categorías en la base de datos');
    } else {
      // Crear categorías de prueba
      await Category.bulkCreate([
        { nombre: 'Electrónica', descripcion: 'Productos electrónicos y tecnología' },
        { nombre: 'Ropa', descripcion: 'Ropa y accesorios' },
        { nombre: 'Hogar', descripcion: 'Artículos para el hogar' },
        { nombre: 'Deportes', descripcion: 'Equipamiento deportivo' },
        { nombre: 'Libros', descripcion: 'Libros y material educativo' }
      ]);
      console.log('✓ Categorías creadas correctamente');
    }

    console.log('\n🎉 Seed completado exitosamente!');
    console.log('\n📝 Credenciales de acceso:');
    console.log('   Admin: admin@test.com / admin123');
    console.log('   Customer: customer@test.com / customer123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
}

seedDatabase();
