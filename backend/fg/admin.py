from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import FGCreationForm
from .models import FG

class UserAdmin(BaseUserAdmin):
    add_form = FGCreationForm

    list_display = ('name', 'student_id', 'role')
    list_filter = ('role',)
    fieldsets = (
        (None, {'fields': ('name', 'student_id', 'role')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'student_id', 'role')}
         ),
    )
    search_fields = ('name',)
    ordering = ('name',)
    filter_horizontal = ()


admin.site.register(FG, UserAdmin)
admin.site.unregister(Group)