from django.apps import AppConfig


class SafehomeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'safehome'

    def ready(self):
        import safehome.signals
