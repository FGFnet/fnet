from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.core.validators import MinLengthValidator

# Create your models here.
class UserManager(BaseUserManager):
    user_in_migrations = True
    def create_user(self, name, student_id):
        try:
            fg = self.model(
                name = name, student_id = student_id
            )
            fg.set_password(student_id)
            fg.save(using=self._db)
            return fg
        except Exception as e:
            print(e)
    def create_superuser(self, name, password, student_id="root"):
        try:
            fg = self.create_user(
                name=name, 
                student_id = password if password else student_id
            )
            fg.is_admin = True
            fg.save(using=self._db)
            return fg
        except Exception as e:
            print(e)

class FG(AbstractBaseUser):
    ADMIN = 'Admin'
    OB = 'OB'
    ACTIVE = 'Active'
    USER_ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (OB, 'OB'),
        (ACTIVE, 'Active'),
    )

    name = models.CharField(max_length=30, unique=True)
    student_id = models.CharField(max_length=10, validators=[MinLengthValidator(10)], null=True)
    role = models.CharField(max_length=10, choices=USER_ROLE_CHOICES, default=ACTIVE)
    campus = models.CharField(max_length=10, default="n")

    objects = UserManager()

    USERNAME_FIELD = "name"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.role

    class Meta:
        db_table = 'fg'
        ordering = ['name']
